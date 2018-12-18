const fs = require('fs')
const path = require('path')
const oss = require('ali-oss').Wrapper

const baseDirectory = path.resolve(__dirname, './dist')
const prefix = `/store/${
  process.env.DEPLOYMENT_ENV !== 'production' ? 'dev' : 'prod'
}/`

const client = oss({
  region: 'oss-cn-beijing',
  // TODO Add your bucket information
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
})

/**
 * 上传单个文件。
 * 由于文件比较大，使用分片上传。
 *
 * @param key OSS 中使用的唯一的 key
 * @param file 待上传的文件
 */
const uploadFile = (key, file) => {
  // eslint-disable-next-line no-console
  console.log(`Uploading ${file} to ${key}`)

  return client
    .multipartUpload(key, file)
    .then(() =>
      // eslint-disable-next-line no-console
      console.log(`Upload to ${key} success`)
    )
    .catch(error =>
      // eslint-disable-next-line no-console
      console.error(`Upload ${file} to ${key} failed due to ${error}`)
    )
}

/**
 * 批量上传多个文件。
 *
 * @param directory 上传文件的路径
 * @return 参数为 URLs 的 Promise
 */
const uploadFilesToOSS = (directory) => {
  const files = fs.readdirSync(directory)

  return Promise.all(
    files.map((file) => {
      const filePath = path.join(directory, file)

      return fs.stat(filePath, (error, stats) => {
        if (error) throw error

        if (stats.isFile()) {
          const key = path
            .relative(baseDirectory, filePath)
            .replace(new RegExp('\\\\', 'g'), '/')

          uploadFile(`${prefix}${key}`, filePath)
        } else if (stats.isDirectory()) {
          uploadFilesToOSS(filePath)
        }
      })
    })
  )
}

uploadFilesToOSS(baseDirectory)
