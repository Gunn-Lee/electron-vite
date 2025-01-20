import { useState } from 'react'

type CreateFolder = {
  folderName: string
}

export function CreateFolder(props: CreateFolder) {
  const [folderName, setFolderName] = useState(props.folderName)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleCreateFolder = async () => {
    try {
      // Windows-specific folder path. Adjust as needed.
      // Note: Use double backslashes to escape in a JavaScript string.

      const result = await window.electron.createFolder()
      console.log(result)
      alert(result.message)
    } catch (error) {
      console.error(error)
      alert('Failed to create folder: ')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button onClick={handleCreateFolder}>Create Folder</button>
      {error && <p>{error}</p>}
      {success && <p>Folder created successfully</p>}
    </div>
  )
}
