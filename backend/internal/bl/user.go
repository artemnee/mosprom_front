package bl

import (
	"crypto/rand"
	"crypto/sha256"
	api_error "ed-platform/internal/api-error"
	"ed-platform/internal/config"
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
	i_repo "ed-platform/internal/repo/i-repo"
	t "ed-platform/internal/types"
	"encoding/base64"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/pbkdf2"
	"gorm.io/gorm"
	"math/big"
	"strings"
	"time"
)

type User struct {
	db  i_repo.IdbData
	cfg *config.Config
}

func NewUser(db i_repo.IdbData, cfg *config.Config) *User {
	return &User{db: db, cfg: cfg}
}

func (u *User) Create(user dto.UserReq) error {
	id, err := uuid.NewV7()
	if err != nil {
		return err
	}
	_, err = u.db.CreateUser(id, user.Name, GenPasswordHash(user.Password), user.Email)
	if err != nil {
		return err
	}

	return nil
}

func (u *User) Login(user dto.UserReq) (string, error) {
	daoUser, err := u.db.GetUserByEmail(user.Email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", &api_error.UserNotFound
		}
	}

	if checkPassword(user.Password, daoUser.Password) {
		token, err := createAccessToken(u.cfg.SecretKey, daoUser.Id.String())
		if err != nil {
			return "", err
		}
		return token.SignedString, nil
	} else {
		return "", &api_error.UserFailedLogin
	}
}

func (u *User) CheckAuth(req string) (*t.Token, error) {
	token, err := VerifyJwtToken([]byte(u.cfg.SecretKey), req)
	if err != nil {
		return nil, err
	}
	return token, nil
}

func (u *User) GetUser(id string) (*dao.User, error) {

	uid, err := uuid.Parse(id)
	if err != nil {
		return nil, &api_error.UserNotFound
	}
	user, err := u.db.GetUserById(uid)
	if err != nil {
		return nil, err
	}
	return user, nil
}

//-------------------

func GenPasswordHash(password string) string {
	letters := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	salt := make([]rune, 32)
	for i := range salt {
		nBig, _ := rand.Int(rand.Reader, big.NewInt(int64(len(letters))))
		salt[i] = letters[nBig.Int64()]
	}

	return fmt.Sprintf("pbkdf2_sha256$260000$%s$%s",
		string(salt),
		base64.StdEncoding.EncodeToString(pbkdf2.Key([]byte(password), []byte(string(salt)), 260000, 32, sha256.New)),
	)
}

func checkPassword(password string, pass string) bool {
	ss := strings.Split(pass, "$")
	if len(ss) == 4 {
		if base64.StdEncoding.EncodeToString(pbkdf2.Key([]byte(password), []byte(ss[2]), 260000, 32, sha256.New)) == ss[3] {
			return true
		} else {
			return false
		}
	}

	return false
}

func createAccessToken(secret, userId string) (*t.Token, error) {
	ta, err := GenJwtToken([]byte(secret), "access", userId)
	if err != nil {
		return nil, err
	}
	return ta, err
}

func GenJwtToken(secret []byte, tokenType string, userid string) (*t.Token, error) {
	u, _ := uuid.NewV7()
	claims := jwt.MapClaims{
		"exp":        jwt.NewNumericDate(time.Now().Add(time.Hour)),
		"iat":        jwt.NewNumericDate(time.Now()),
		"jti":        fmt.Sprintf("%x", u),
		"token_type": tokenType,
		"user_id":    userid,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedString, err := token.SignedString(secret)
	if err != nil {
		return nil, err
	}

	sigStr := signedString[strings.LastIndex(signedString, ".")+1:]
	sig, err := base64.RawURLEncoding.DecodeString(sigStr)
	if err != nil {
		return nil, err
	}
	token.Signature = sig

	return &t.Token{
		JWT:          token,
		SignedString: signedString,
		Type:         tokenType,
	}, nil
}

func VerifyJwtToken(secret []byte, signedString string) (*t.Token, error) {
	token, err := jwt.Parse(signedString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("неподдерживаемый метод подписи: %v", token.Header["alg"])
		}
		return secret, nil
	})

	if err != nil {
		return nil, fmt.Errorf("ошибка при парсинге токена: %w", err)
	}

	if !token.Valid {
		return nil, fmt.Errorf("токен недействителен")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, fmt.Errorf("неправильный тип claims")
	}

	requiredFields := []string{"exp", "iat", "jti", "token_type", "user_id"}
	for _, field := range requiredFields {
		if _, exists := claims[field]; !exists {
			return nil, fmt.Errorf("отсутствует обязательное поле: %s", field)
		}
	}

	return &t.Token{
		JWT:          token,
		SignedString: signedString,
		Type:         claims["token_type"].(string),
	}, nil
}
