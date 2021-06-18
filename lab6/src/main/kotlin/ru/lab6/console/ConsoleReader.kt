package ru.lab6.console

import ru.lab6.exceptions.InputException
import ru.lab6.math.CommonUtils.Companion.MAX_ACCURACY
import ru.lab6.math.CommonUtils.Companion.MAX_INTERVAL_COUNT
import ru.lab6.math.CommonUtils.Companion.MIN_ACCURACY
import ru.lab6.math.CommonUtils.Companion.MIN_INTERVAL_COUNT
import ru.lab6.math.CommonUtils.Companion.functions
import ru.lab6.models.DataInput
import java.util.*
import kotlin.math.floor
import kotlin.math.roundToInt

class ConsoleReader {

    fun readInput(): DataInput {
        val funcNumber: Int = getAvailableVariant(IntArray(functions.size) {it+1},
            "Выберите ОДУ:\n1 - ${functions[0].view}\n2 - ${functions[1].view}\n3 - ${functions[2].view}") - 1
        val method: Int = getAvailableVariant(IntArray(2) {it+1},
            "Выберите метод:\n1 - Метод Эйлера\n2 - Метод Милна")
        val startConditions: Array<Double> = getDoubleArray("Введите x0 и y0:")
        val xn: Double = getDoubleValue("Введите конец интервала(x_n):")
        val h: Double = getDoubleValue("Введите интервал(h):")
        val accuracy: Double = getDoubleValue("Введите точность", MAX_ACCURACY, MIN_ACCURACY)

        val n: Double = (xn - startConditions[0]) / h
        if(n % 1.0 != 0.0)
            throw InputException("От x_0 до x_n должно быть целое кол-во интервалов!!!")

        if(floor(n).roundToInt() + 1 < MIN_INTERVAL_COUNT || floor(n).roundToInt() + 1 > MAX_INTERVAL_COUNT)
            throw InputException("Кол-во интервалов должно быть от $MIN_INTERVAL_COUNT до $MAX_INTERVAL_COUNT!!!")

        return DataInput(functions[funcNumber], method, startConditions[0], startConditions[1],
            xn, h,floor(n).roundToInt() + 1,  accuracy)
    }

    private fun getDoubleValue(message: String, max: Double = Double.MAX_VALUE, min: Double = Double.MIN_VALUE): Double {
        val scanner = Scanner(System.`in`)
        scanner.useLocale(Locale.US)
        var result: Double = Double.NaN
        while (result.isNaN() || result > max || result < min) {
            println(message)
            result = scanner.nextDouble()
        }
        return result
    }

    private fun getAvailableVariant(variants: IntArray, message: String): Int {
        val scanner = Scanner(System.`in`)
        var variant: Int = -1
        while (!variants.contains(variant)) {
            println(message)
            variant = scanner.nextInt()
        }
        return variant
    }

    private fun getDoubleArray(message: String): Array<Double> {
        println(message)
        return readLine()!!.split(' ').map { it.toDouble() }.toTypedArray()
    }
}
