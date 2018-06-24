 /*Реалізувати функцію, яка приймає один параметр (об’єкт Date - дату народження, наприклад new Date(1990, 10, 5)) та повертає вік - кількість повних років.
Реалізувати базовий клас Square, конструктор якого приймає 2 параметри - width and height та має лише один публічний метод - getArea, який повертає площу фігури як width * height.
Реалізувати клас Circle, який наслідується від Square та має свою власну реалізацію методу для обчислення площі.
Реалізувати клас Area, який має одну захищену властивість _figures - масив, та методи
addFigure(figure) - додає об’єкт фігури в масив _figures
clear - очищає масив _figures
В класі Area реалізувати геттер size використовуючи Object.defineProperty, який повертає загальну площу всіх доданих фігур.*/

function getUserFullYear(date) {
    return new Date().getFullYear() - date.getFullYear(); //?
}
console.log( getUserFullYear( new Date(1990, 10, 5) ));

function Square(width, height) {
    this.getArea = () => width * height;
}

let square = new Square(5,3);
//console.log( square.getArea() );

function Circle(width, height) {
    Square.apply(this, arguments);
    
    this.getArea = () => width * height * Math.PI;
}

let circle = new Circle(2,3);
//console.log( circle.getArea() );

function Area() {
    this._figures = new Array();

    this.addFigure = (figure) => this._figures.push(figure);

    this.clear = () => this._figures.length = 0; 

    Object.defineProperty(this, "size", {
        get: () => this._figures.reduce( (sum, figure) => sum + figure.getArea(), 0 )
    })
}

let area = new Area();
area.addFigure(circle);
area.addFigure(square);
//console.log( area._figures );

console.log( area.size );
