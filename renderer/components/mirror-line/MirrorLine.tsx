import { MouseEventHandler } from 'react';
import styles from './MirrorLine.module.css'

export default function MirrorLine({ isMirrorable, mirrorSourceDirectory }
: { isMirrorable:boolean, mirrorSourceDirectory: MouseEventHandler<HTMLButtonElement>
}) {    
    return (
        <section className={styles.section}>
            <div className={styles.horizontalLine}>
            {isMirrorable
                ?
                    <button
                        className={styles.logoBox}
                        onClick={mirrorSourceDirectory}
                    ></button>
                :
                    <div className={styles.logoBox}></div>
            }
            </div>
        </section>
    );
}
