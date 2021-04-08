import methods.solveRectangleMethod
import methods.solveSimpsonMethod
import methods.solveTrapezoidMethod
import kotlin.math.abs

/*
1.	Пользователь выбирает функцию, интеграл которой требуется вычислить (3-5 функций), из тех,
 которые предлагает программа.
2.	Пределы интегрирования задаются пользователем.
3.	Точность вычисления задаются пользователем.
4.	Начальное значение числа разбиения интервала интегрирования: n=4.
5.	Ввод исходных данных осуществляется с клавиатуры.

Программная реализация задачи:
1.	Реализовать в программе методы по выбору пользователя:
    •	Метод прямоугольников (3 модификации: левые, правые, средние)
    •	Метод трапеций
    •	Мет од Симпсона
2.	Методы должны быть оформлены в виде отдельной(ого) функции/класса.
3.	Вычисление значений функции оформить в виде отдельной(ого) функции/класса.
4.	Предусмотреть вывод результатов: значение интеграла, число разбиения интервала интегрирования для достижения требуемой точности.

 */

fun main() {
    println("Доступные функции:")
    val functions = arrayListOf<(Double) -> Double>(
        { x -> x * x * x - 3 * x * x + 7 * x - 10 }, // 26
        { x -> x * x * x + 4 * x * x + 8 * x - 12 }, //297.066
        { x -> -3 * x * x + 7 * x + 10 } //66
    )
    val funcStrings = arrayListOf("x³ - 3x² + 7x - 10",
        "x³ + 4x² + 8x - 12", "-3x² + 7x + 10")
    for ((i, str) in funcStrings.withIndex()) {
        println("${i + 1}) $str")
    }
    println("Выберите номер функции:")
    val funcNumber = (readLine()!!.toIntOrNull() ?: 1) - 1

    println("Выберите a (2 по умолчанию)")
    val a = readLine()!!.toDoubleOrNull() ?: 2.0

    println("Выберите b (4 по умолчанию)")
    val b = readLine()!!.toDoubleOrNull() ?: 4.0

    println("Выберите точность вычисления")
    val accuracy = readLine()!!.toDoubleOrNull() ?: 1.0

    var n = 4

    println("Выберите номер метода:")
    val methodsStrings = arrayListOf<String>("Метод левых прямоугольников",
        "Метод правых прямоугольников", "Метод центральных прямоугольников",
        "Метод трапеций", "Метод Симпсона")
    for ((j, str) in methodsStrings.withIndex()) {
        println("${j + 1}) $str")
    }


    var methodNum = (readLine()!!.toIntOrNull() ?: 1) - 1
    when (methodNum) {
        !in 0..4 -> methodNum = 0
    }
    println("""       Выбрано 
        |функция: ${funcStrings[funcNumber]};
        |a: $a, b: $b;
        |точность вычисления: $accuracy;
        |метод: ${methodsStrings[methodNum]}""".trimMargin())

    var result: Double
    var result2: Double
    do {
        when (methodNum) {
            0 -> {
                fun leftMode(a: Double, b: Double): Double = a
                result = solveRectangleMethod(functions[funcNumber],
                    a, b, n, { aa, bb -> leftMode(aa, bb) })
                result2 = solveRectangleMethod(functions[funcNumber],
                    a, b, n * 2, { aa, bb -> leftMode(aa, bb) })
            }
            1 -> {
                fun rightMode(a: Double, b: Double): Double = b
                result = solveRectangleMethod(functions[funcNumber],
                    a, b, n, { aa, bb -> rightMode(aa, bb) })
                result2 = solveRectangleMethod(functions[funcNumber],
                    a, b, n * 2, { aa, bb -> rightMode(aa, bb) })
            }
            2 -> {
                fun centerMode(a: Double, b: Double): Double = (a + b) / 2.0
                result = solveRectangleMethod(functions[funcNumber],
                    a, b, n, { aa, bb -> centerMode(aa, bb) })
                result2 = solveRectangleMethod(functions[funcNumber],
                    a, b, n * 2, { aa, bb -> centerMode(aa, bb) })
            }
            3 -> {
                result = solveTrapezoidMethod(functions[funcNumber], a, b, n)
                result2 = solveTrapezoidMethod(functions[funcNumber], a, b, n*2)
            }

            4 -> {
                result = solveSimpsonMethod(functions[funcNumber], a, b, n)
                result2 = solveSimpsonMethod(functions[funcNumber], a, b, n*2)
            }
            else -> {
                result = 0.0
                result2 = 0.0
            }
        }
        n *= 2
    } while (abs(result - result2) > accuracy)

    println("Ответ: $result2\nколичество разбиений интервала для достижения заданной точности $accuracy: $n")
}

