package main

import (
	"context"
	"encoding/base64"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"

	"AccountManagement/utils"
)

// App struct
type App struct {
	ctx    context.Context
	aesKey utils.AESKey // 存储AES密钥
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx

	// 初始化AES密钥 (使用AES-256)
	key, err := utils.GenerateAESKey(32)
	if err != nil {
		runtime.LogError(ctx, "生成AES密钥失败: "+err.Error())
		return
	}
	a.aesKey = key
	runtime.LogInfo(ctx, "AES密钥初始化成功")
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	dialog, err := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Type:          runtime.QuestionDialog,
		Title:         "关闭应用确认",
		Message:       "Are you sure you want to quit?",
		Buttons:       []string{"确定", "取消"},
		DefaultButton: "确定",
		CancelButton:  "取消",
	})

	if err != nil {
		return false
	}
	return dialog != "确定"
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// EncryptData 加密字符串数据
func (a *App) EncryptData(plaintext string) (string, error) {
	if a.aesKey == nil {
		return "", fmt.Errorf("AES密钥未初始化")
	}

	// 加密数据
	return utils.EncryptAESGCM([]byte(plaintext), a.aesKey)
}

// DecryptData 解密字符串数据
func (a *App) DecryptData(ciphertext string) (string, error) {
	if a.aesKey == nil {
		return "", fmt.Errorf("AES密钥未初始化")
	}

	// 解密数据
	plaintext, err := utils.DecryptAESGCM(ciphertext, a.aesKey)
	if err != nil {
		return "", err
	}

	return string(plaintext), nil
}

// EncryptBytes 加密二进制数据并返回Base64编码的字符串
func (a *App) EncryptBytes(data []byte) (string, error) {
	if a.aesKey == nil {
		return "", fmt.Errorf("AES密钥未初始化")
	}

	// 加密数据
	return utils.EncryptAESGCM(data, a.aesKey)
}

// DecryptToBytes 解密Base64编码的字符串并返回二进制数据
func (a *App) DecryptToBytes(ciphertext string) ([]byte, error) {
	if a.aesKey == nil {
		return nil, fmt.Errorf("AES密钥未初始化")
	}

	// 解密数据
	return utils.DecryptAESGCM(ciphertext, a.aesKey)
}

// GetEncryptionKeyBase64 获取当前加密密钥的Base64编码（仅用于调试）
func (a *App) GetEncryptionKeyBase64() string {
	if a.aesKey == nil {
		return ""
	}
	return base64.StdEncoding.EncodeToString(a.aesKey)
}
