# Vue(1) 基本使用

## 模板（插值，指令）

- 插值，表达式
- 指令，动态属性
- v-html：会有XSS风险，会覆盖子组件
- data中写不写return的区别
  - 不使用return包裹的数据会在项目的全局可见，会造成变量污染 。
  - 使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件。
- computed和watch
  - computed有缓存，data不变则不会重新计算
			是一个计算属性，类似于过滤器，对绑定到view的数据进行处理
			计算出的值赋值到这个变量上，所以computed中定义的变量不能在data中重复定义
			get()和set()
				get(): 回调函数 当需要读取当前属性值时执行，根据相关数据计算并返回当前属性的值
				set(): 监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
			computed
		watch如何深度监听
			watch
		watch监听引用类型，拿不到oldVal
	class和style
		使用动态属性
			class&style
		使用驼峰式写法
	条件
		v-if v-else的用法，可使用变量，也可以使用===表达式
			条件
		v-if和v-show的区别？
			v-if 如果不满足条件不会渲染dom
				
			v-show 如果不满足条件会使用display:none
		v-if和v-show的使用场景？
			如果更新不频繁使用v-if，如果更新频繁使用v-show
	循环
		如何遍历对象？
			也可以用v-for
				循环
		key的重要性。key不能乱写（如random或者index）
		v-for和v-if不能一起使用
	事件
		event参数，自定义参数
			event
		事件被绑定到哪里？
			1. event是原生的
			2. 事件被挂载到当前元素，和DOM事件一样。
		事件修饰符，按键修饰符
			事件修饰符
			按键修饰符
	表单
		v-model
		常见表单项 textarea checkbox radio select
			表单
			表单
		修饰符 lazy number trim
			trim
				前后空格清除
			lazy
				防抖
			number
				转化为数字