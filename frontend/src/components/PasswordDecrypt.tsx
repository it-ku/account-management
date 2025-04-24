
import { useState } from 'react';
import { DecryptData } from '../../wailsjs/go/main/App';

export function PasswordDecrypt() {
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDecrypt = async () => {
    if (!encrypted.trim()) {
      setError('请输入需要解密的密文');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      const result = await DecryptData(encrypted);
      setDecrypted(result);
    } catch (err) {
      console.error('解密失败:', err);
      setError('解密失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">密码解密</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="space-y-4">
          <div>
            <label htmlFor="encrypted" className="block text-sm font-medium text-slate-700 mb-1">
              加密字符串
            </label>
            <textarea
              id="encrypted"
              value={encrypted}
              onChange={(e) => setEncrypted(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="请输入需要解密的密文"
            />
          </div>
          
          <div>
            <label htmlFor="decrypted" className="block text-sm font-medium text-slate-700 mb-1">
              解密结果
            </label>
            <input
              type="text"
              id="decrypted"
              value={decrypted}
              readOnly
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none bg-slate-50"
              placeholder="解密后的结果将显示在这里"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          <div className="pt-2">
            <button
              onClick={handleDecrypt}
              disabled={loading}
              className={`px-4 py-2 ${loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
            >
              {loading ? '解密中...' : '解密'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}