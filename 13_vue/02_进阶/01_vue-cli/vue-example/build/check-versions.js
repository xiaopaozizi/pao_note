// 输入终端的样式
var chalk = require('chalk')
//处理版本号的，两个版本进行对比
var semver = require('semver')
var packageConfig = require('../package.json')
//执行终端的命令
var shell = require('shelljs')
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}
// 版本要求
var versionRequirements = [
  {
    name: 'node',
    // 当前版本
    currentVersion: semver.clean(process.version),
    // 版本要求
    versionRequirement: packageConfig.engines.node
  },
]
// 全局搜索npm
if (shell.which('npm')) {
  // 如果有npm，则加入我版本检查中
  versionRequirements.push({
    name: 'npm',
    // 最新版本
    currentVersion: exec('npm --version'),
    // npm最低版本
    versionRequirement: packageConfig.engines.npm
  })
}
// 导出函数
module.exports = function () {
  var warnings = []
  // 遍历所有的版本要求
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    // 如果当前版本没有在你的版本要求内，那么久发出警告
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      // 警告你的设备版本要在要求版本内
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  // 如果有版本警告的信息，就会打印出来
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    // 最后退出程序
    process.exit(1)
  }
}
