package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"io"
)

// AESKey 是AES加密的密钥，必须是16、24或32字节长度（对应AES-128、AES-192或AES-256）
type AESKey []byte

// GenerateAESKey 生成指定长度的AES密钥
func GenerateAESKey(keySize int) (AESKey, error) {
	if keySize != 16 && keySize != 24 && keySize != 32 {
		return nil, errors.New("密钥长度必须是16、24或32字节")
	}

	key := make([]byte, keySize)
	_, err := io.ReadFull(rand.Reader, key)
	if err != nil {
		return nil, err
	}

	return key, nil
}

// EncryptAESGCM 使用AES-GCM模式加密数据
func EncryptAESGCM(plaintext []byte, key AESKey) (string, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	// 创建GCM模式
	aead, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	// 创建随机数（Nonce）
	nonce := make([]byte, aead.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}

	// 加密数据
	ciphertext := aead.Seal(nonce, nonce, plaintext, nil)

	// 返回Base64编码的密文
	return base64.StdEncoding.EncodeToString(ciphertext), nil
}

// DecryptAESGCM 使用AES-GCM模式解密数据
func DecryptAESGCM(ciphertext string, key AESKey) ([]byte, error) {
	// 解码Base64
	data, err := base64.StdEncoding.DecodeString(ciphertext)
	if err != nil {
		return nil, err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	// 创建GCM模式
	aead, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	// 检查数据长度
	if len(data) < aead.NonceSize() {
		return nil, errors.New("密文长度不足")
	}

	// 分离Nonce和密文
	nonce, ciphertextBytes := data[:aead.NonceSize()], data[aead.NonceSize():]

	// 解密
	plaintext, err := aead.Open(nil, nonce, ciphertextBytes, nil)
	if err != nil {
		return nil, err
	}

	return plaintext, nil
}
