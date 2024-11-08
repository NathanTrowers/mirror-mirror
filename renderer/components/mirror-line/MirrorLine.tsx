import styles from './MirrorLine.module.css'

export default function MirrorLine() {
    return (
        <section className={styles.section}>
            <div className={styles.horizontalLine}>
                <div className={styles.logoBox}></div>
            </div>
        </section>
    );
}
