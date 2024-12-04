import { MouseEventHandler } from 'react';
import Image from 'next/image';

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
                    >
                        <Image 
                            className={styles.image}
                            width='169'
                            height='38'
                            src='/images/logo.png'
                            alt='MirrorMirror Logo'
                        />
                    </button>
                :
                    <div className={styles.logoBox}>
                        <Image
                            width='169'
                            height='38'
                            src='/images/logo.png'
                            alt='MirrorMirror Logo'
                        />
                    </div>
            }
            </div>
        </section>
    );
}
