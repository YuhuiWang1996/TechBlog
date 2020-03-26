# JS设计模式(1) - 设计原则

## 1. 面向对象

- 三要素
  - 继承
  - 封装
    - public : 完全开放
    - protected : 对子类开放
    - private : 对自己开放
    - 减少耦合，不该外露的隐藏
    - 利于数据、接口的权限管理
    - **ES6目前不支持**，一般认为_开头的属性是private
  - 多态
    - JS用的很少

- 意义
  - 对于计算机，结构化的才是最简单的。
  - 对于程序运行，循环、判断、顺讯是结构化
  - 对于数据，面向对象就是结构化

## 2. 设计原则

- 何为设计？
  - 按照一种思路或者标准来实现功能
  - 功能相同，可以有不同的设计方案来实现
  - 伴随着需求增加，设计的作用才能体现出来
- 《UNIX/LINUX设计哲学》
  1. 小即是美
  2. 让每个程序只做好一件事
  3. 快速建立原型
  4. 舍弃高效率而取可移植性
  5. 采用纯文本来存储数据
  6. 充分利用软件的杠杆效应（复用）
  7. 使用shell脚本来提高杠杆效应和可移植性
  8. 避免强制性的用户界面
  9. 让每个程序都称为过滤器
     - linux命令行使用 | 从一个命令流到另一个

  - 小准则
    - 允许用户定制环境
    - 尽量使操作系统内核小而轻量化
    - 使用小写字母并尽量简短
    - 沉默是金
    - 各部分之和大于整体
    - 寻求90%的解决方案

- **SOLID** 五大设计原则
- S - **单一职责原则**
  - 一个程序只做好一件事
  - 如果功能过于复杂就拆分开，每个部分保持独立
- O - **开放封闭原则**
  - 对扩展开放，对修改封闭
  - 增加需求时，扩展新代码，而非修改已有代码
  - 这是软件设计的终极目标
- L - 李氏置换原则
  - 子类能覆盖父类
  - 父类能出现的地方子类就能出现
  - JS中使用较少（弱类型 & 继承使用较少）
- I - 接口独立原则
  - 保持接口的单一独立，避免出现“胖接口”
  - JS中没有接口（typescript例外），使用较少
  - 类似于单一职责原则，这里更关注接口
- D - 依赖倒置原则
  - 面向接口编程，依赖于抽象而不依赖于具体
  - 使用方只关注接口而不关注具体类的实现
  - JS中使用较少（没有接口 & 弱类型）

## 3. 设计模式

- 创建型
  - 工厂模式
    - 工厂方式模式
    - 抽象工厂模式
    - 建造者模式
  - 单例模式
  - 原型模式
- 结构型
  - 适配器模式
  - 装饰器模式
  - 代理模式
  - 外观模式
  - 桥接模式
  - 组合模式
  - 享元模式
- 行为型
  - 策略模式
  - 模板方法模式
  - **观察者模式**
  - **迭代器模式**
  - 职责链模式
  - 命令模式
  - 备忘录模式
  - **状态模式**
  - 访问者模式
  - 中介者模式
  - 解释器模式