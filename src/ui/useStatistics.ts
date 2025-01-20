import { useEffect, useState } from 'react'

export function useStatistics(dataPointCount: number) {
  const [value, setValue] = useState<Statistics[]>([])

  useEffect(() => {
    const unsub = window.electron.subscribeStatistics((statistics: any) =>
      setValue((prev) => {
        const newData = [...prev, statistics]
        if (newData.length > dataPointCount) {
          newData.shift()
        }
        return newData
      })
    )

    return unsub
  }, [])
  return value
}
