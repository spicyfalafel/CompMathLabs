package ru.lab6.console

import ru.lab6.math.CommonUtils
import ru.lab6.math.CommonUtils.Companion.roundToFixed
import ru.lab6.math.RungeCalculator
import ru.lab6.models.DataInput
import ru.lab6.models.MethodResult

class ResultWriter {

    fun writeResult(input: DataInput, methodResult: MethodResult) {
        val dp: Int = 5
        println("=========================")
        println("%-15s %-15s %-15s %-15s %-15s %-15s".format("i", "x_i", "y_i", "f(x_i, y_i)", "Точное",
            "Погрешность по Рунге"))

        methodResult.indexes.forEach {
            println("%-15s %-15s %-15s %-15s %-15s %-15s".format(it.toString(),
                roundToFixed(methodResult.xValues[it], dp),
                roundToFixed(methodResult.yValues[it], dp),
                roundToFixed(methodResult.derivativeValues[it], dp),
                roundToFixed(methodResult.exactValues[it], dp),
                roundToFixed(RungeCalculator().calculateR(input)[it], 3)
            )) }
    }
}
