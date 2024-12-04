import { Fragment, useMemo, useState } from 'react'
import Head from 'next/head'
import MirrorLine from '../components/mirror-line/MirrorLine'
import FolderSelect from '../components/folder-select/FolderSelect'
import FolderSelection from '../components/folder-select/FolderSelection'
import ErrorMessage from '../components/error-message/ErrorMessage'

export default function HomePage() {
  const [showErrorMessage, setShowErrorMessage] = useState(false)
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

  const onCloseDialogueBox = () => {
    setShowErrorMessage(false);
  }

  const onMirrorSourceDirectory = () => {
    window.ipc.send('MirrorTime', { source: source, target: target });
    window.ipc.on('MirrorTime', (isMirrored: any[]) => {
      if (!isMirrored) {setShowErrorMessage(true);}
      window.ipc.send('onTargetFolderSelect', target?.folderPath);
      window.ipc.send('onSourceFolderSelect', source?.folderPath);
  });
  }

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
      {showErrorMessage && <ErrorMessage closeDialogueBox={onCloseDialogueBox} />}
    </Fragment>
  )
}
