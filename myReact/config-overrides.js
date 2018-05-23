const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
	//按需加载配置
	const { injectBabelPlugin } = require('react-app-rewired');
	//按需加载配置
	config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
	//配置别名
    config.resolve.alias = {
        '@': resolve('src')
    }
    return config;
}