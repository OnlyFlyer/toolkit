const inquirer = require('inquirer')
const fs = require('fs')
const { spawn } = require('child_process')

try {
  inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '请选 build 类型',
      choices: ['major', 'minor', 'patch']
    }
  ]).then((a, b) => {
    console.log('a:', a)
    console.log('b:', b)
  })
} catch (err) {}