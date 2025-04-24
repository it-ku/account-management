import { useState } from 'react';
import { EncryptData } from '../../wailsjs/go/main/App';

export function PasswordEncrypt() {
  const [password, setPassword] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEncrypt = async () => {
    if (!password.trim()) {
      setError('请输入需要加密的密码');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      const result = await EncryptData(password);
      setEncrypted(result);
    } catch (err) {
      console.error('加密失败:', err);
      setError('加密失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">密码加密</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              输入密码
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入需要加密的密码"
            />
          </div>
          
          <div>
            <label htmlFor="encrypted" className="block text-sm font-medium text-slate-700 mb-1">
              加密结果
            </label>
            <textarea
              id="encrypted"
              value={encrypted}
              readOnly
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none bg-slate-50"
              rows={3}
              placeholder="加密后的结果将显示在这里"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          <div className="pt-2">
            <button
              onClick={handleEncrypt}
              disabled={loading}
              className={`px-4 py-2 ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {loading ? '加密中...' : '加密'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}