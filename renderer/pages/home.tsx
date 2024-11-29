import { Fragment, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import MirrorLine from '../components/mirror-line/MirrorLine'
import FolderSelect from '../components/folder-select/FolderSelect'
import FolderSelection from '../components/folder-select/FolderSelection'

export default function HomePage() {
  const [message, setMessage] = useState('No message found')
  const [source, setSource] = useState({folderPath: '', folderContents: []});
  const [target, setTarget] = useState({folderPath: '', folderContents: []});
  const [isMirrorable, setIsMirrorable] = useState(false);
  
  useMemo(() => {
    if (JSON.stringify(source) !== JSON.stringify({folderPath: '', folderContents: []})
       && JSON.stringify(target) !== JSON.stringify({folderPath: '', folderContents: []})
    ) {
      setIsMirrorable(true);
    }
  }, [source, target]);

  const onTargetFolderSelect = (targetData: FolderSelection) => {
    setTarget(targetData); 
  }

  const onSourceFolderSelect = (sourceData: FolderSelection) => {
    setSource(sourceData); 
  }

  const onMirrorSourceDirectory = () => {
    window.ipc.send('MirrorTime', { source: source, target: target });
    window.ipc.on('MirrorTime', (isMirrored: any[]) => {
      if (!isMirrored) {console.log('SHOW ERROR MESSAGE!!!!!!!!!!!')}
      window.ipc.send('onTargetFolderSelect', target?.folderPath);
      window.ipc.send('onSourceFolderSelect', source?.folderPath);
  });
  }

  useEffect(() => { // TODO: AIRMARK TO REMOVE
    window.ipc.on('message', (message: string) => {
      setMessage(message)
    })
  }, [])

  return (
    <Fragment>
      <Head>
        <title>MirrorMirror</title>
      </Head>
      <FolderSelect
        mirror={true}
        onFolderSelect={onTargetFolderSelect}
      />
      <MirrorLine 
        isMirrorable={isMirrorable}
        mirrorSourceDirectory={onMirrorSourceDirectory}
      />
      <FolderSelect
        mirror={false}
        onFolderSelect={onSourceFolderSelect}
      />
      {/* <div>
        <p>
          ⚡ Electron + Next.js ⚡ -<Link href="/next">Go to next page</Link>
        </p>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width={256}
          height={256}
        />
      </div>
      <div>
        <button
          onClick={() => {
            window.ipc.send('message', 'Hello')
          }}
        >
          Test IPC
        </button>
        <p>{message}</p>
      </div> */}
    </Fragment>
  )
}
