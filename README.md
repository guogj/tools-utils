# tools-utils

前端工具库
安装使用

1. 安装包使用方式
   安装

# npm

npm install tools-utils -S

# yarn

yarn add tools-utils -S
ESM 导入使用

import { random } from 'tools-utils'
console.log(random(1, 10))

RequireJS 导入使用

const { random } = require('dip-utils')
console.log(random(1, 10))

2. 网页 script 直接引入使用方式
   直接拷贝 dist 下的 dip-utils-umd.js 到项目里面，可直接引用

<!DOCTYPE html>
<html lang="en">
  <body>
    <script src="/dist/dip-utils-umd.js"></script>
    <script>
      console.log(dutils.random(1, 10))
    </script>
  </body>
</html>
