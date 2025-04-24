import { useState } from 'react';
import { Button } from './ui/button';

type Account = {
  id: number;
  siteName: string;
  siteUrl: string;
  username: string;
  password: string;
};

export function AccountManagement() {
  // 模拟账号数据
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, siteName: '百度', siteUrl: 'https://www.baidu.com', username: 'baidu_user', password: 'password123' },
    { id: 2, siteName: '淘宝', siteUrl: 'https://www.taobao.com', username: 'taobao_user', password: 'taobao@123' },
    { id: 3, siteName: '京东', siteUrl: 'https://www.jd.com', username: 'jd_user', password: 'jd@2023' },
  ]);
  
  // 搜索关键词
  const [searchTerm, setSearchTerm] = useState('');
  // 显示/隐藏密码的状态
  const [visiblePasswords, setVisiblePasswords] = useState<{[key: number]: boolean}>({});
  // 编辑模式
  const [editMode, setEditMode] = useState<number | null>(null);
  // 新账号表单
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccount, setNewAccount] = useState<Omit<Account, 'id'>>({ 
    siteName: '', 
    siteUrl: '', 
    username: '', 
    password: '' 
  });
  // 编辑账号表单
  const [editAccount, setEditAccount] = useState<Account | null>(null);

  // 处理搜索
  const filteredAccounts = accounts.filter(account => 
    account.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.siteUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 切换密码可见性
  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 添加新账号
  const handleAddAccount = () => {
    if (!newAccount.siteName || !newAccount.username || !newAccount.password) {
      alert('请填写必要信息！');
      return;
    }
    
    const newId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
    setAccounts([...accounts, { ...newAccount, id: newId }]);
    setNewAccount({ siteName: '', siteUrl: '', username: '', password: '' });
    setShowAddForm(false);
  };

  // 开始编辑账号
  const startEdit = (account: Account) => {
    setEditAccount(account);
    setEditMode(account.id);
  };

  // 保存编辑
  const saveEdit = () => {
    if (editAccount) {
      setAccounts(accounts.map(acc => acc.id === editAccount.id ? editAccount : acc));
      setEditMode(null);
      setEditAccount(null);
    }
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditMode(null);
    setEditAccount(null);
  };

  // 删除账号
  const deleteAccount = (id: number) => {
    if (window.confirm('确定要删除这个账号吗？')) {
      setAccounts(accounts.filter(acc => acc.id !== id));
    }
  };

  // 处理编辑表单变更
  const handleEditChange = (field: keyof Account, value: string) => {
    if (editAccount) {
      setEditAccount({
        ...editAccount,
        [field]: value
      });
    }
  };

  // 处理新账号表单变更
  const handleNewAccountChange = (field: keyof Omit<Account, 'id'>, value: string) => {
    setNewAccount({
      ...newAccount,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">账号管理</h2>
      
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索账号"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {showAddForm ? '取消添加' : '添加账号'}
        </Button>
      </div>

      {/* 添加账号表单 */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-4">
          <h3 className="text-lg font-medium mb-4">添加新账号</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">网站名称 *</label>
              <input
                type="text"
                value={newAccount.siteName}
                onChange={(e) => handleNewAccountChange('siteName', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例如：百度"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">网站链接</label>
              <input
                type="text"
                value={newAccount.siteUrl}
                onChange={(e) => handleNewAccountChange('siteUrl', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例如：https://www.baidu.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">账号 *</label>
              <input
                type="text"
                value={newAccount.username}
                onChange={(e) => handleNewAccountChange('username', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="账号/用户名/邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">密码 *</label>
              <input
                type="password"
                value={newAccount.password}
                onChange={(e) => handleNewAccountChange('password', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="密码"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleAddAccount}
              className="bg-blue-600 hover:bg-blue-700"
            >
              保存
            </Button>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                网站名称
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                网站链接
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                账号
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                密码
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredAccounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {account.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {editMode === account.id ? (
                    <input
                      type="text"
                      value={editAccount?.siteName || ''}
                      onChange={(e) => handleEditChange('siteName', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded-md"
                    />
                  ) : (
                    account.siteName
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {editMode === account.id ? (
                    <input
                      type="text"
                      value={editAccount?.siteUrl || ''}
                      onChange={(e) => handleEditChange('siteUrl', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded-md"
                    />
                  ) : (
                    <a href={account.siteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {account.siteUrl}
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {editMode === account.id ? (
                    <input
                      type="text"
                      value={editAccount?.username || ''}
                      onChange={(e) => handleEditChange('username', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded-md"
                    />
                  ) : (
                    account.username
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {editMode === account.id ? (
                    <input
                      type={visiblePasswords[account.id] ? "text" : "password"}
                      value={editAccount?.password || ''}
                      onChange={(e) => handleEditChange('password', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded-md"
                    />
                  ) : (
                    <div className="flex items-center">
                      <span className="mr-2">
                        {visiblePasswords[account.id] ? account.password : '••••••••'}
                      </span>
                      <button 
                        onClick={() => togglePasswordVisibility(account.id)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <svg 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          {visiblePasswords[account.id] ? (
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                            />
                          ) : (
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                            />
                          )}
                        </svg>
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editMode === account.id ? (
                    <>
                      <button 
                        onClick={saveEdit} 
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        保存
                      </button>
                      <button 
                        onClick={cancelEdit} 
                        className="text-slate-600 hover:text-slate-900"
                      >
                        取消
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => startEdit(account)} 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        编辑
                      </button>
                      <button 
                        onClick={() => deleteAccount(account.id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredAccounts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-slate-500">
                  没有找到匹配的账号记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}