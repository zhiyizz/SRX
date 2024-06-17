import styles from '@styles/layouts/error.module.scss'

export default function ErrorPage() {
  return (
    <div className={styles['error-page']}>
      <div>
        <h2 className={styles.title}><span className={styles.code}>404</span><small>预览不存在</small></h2>
        <p>当前页面未开启预览或访问地址有误！</p>
        <p>访问地址并非地址栏中所显示的，请检查后再试。</p>
      </div>
    </div>
  )
}
