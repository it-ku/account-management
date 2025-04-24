import React from "react"
import { Layout } from "@/components/Layout"
import { PasswordEncrypt } from "@/components/PasswordEncrypt"
import { PasswordDecrypt } from "@/components/PasswordDecrypt"
import { AccountManagement } from "@/components/AccountManagement"

function App() {
  const [activeMenu, setActiveMenu] = React.useState('password-encrypt')

  // 根据activeMenu渲染对应的组件
  const renderContent = () => {
    switch (activeMenu) {
      case 'password-encrypt':
        return <PasswordEncrypt />
      case 'password-decrypt':
        return <PasswordDecrypt />
      case 'account-management':
        return <AccountManagement />
      default:
        return <PasswordEncrypt />
    }
  }

  return (
    <Layout onMenuChange={setActiveMenu}>
      {renderContent()}
    </Layout>
  )
}

export default App
