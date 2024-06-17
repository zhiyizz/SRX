import styles from '@styles/preview.module.scss'

export default async function Preview({
  searchParams,
}: {
  searchParams: { id: string, code: string, err?: string }
}) {
  return (
    <div className={styles.main}>
      {searchParams.err && <h2>{searchParams.err === 'unmatch' ? '密码不匹配' : '发生错误'}，请重试</h2>}
      <div className={styles.frame}>
        <h3>输入访问密码以继续：</h3>
        <form method="post" action="/api/preview">
          <div className={styles.group}>
            <input type="password" name="pass" maxLength={30} autoFocus placeholder="请输入密码" required />
            <button className="btn">进入</button>
          </div>
          <input type="hidden" name="id" value={searchParams.id} />
          <input type="hidden" name="code" value={searchParams.code} />
        </form>
      </div>
    </div>
  )
}
