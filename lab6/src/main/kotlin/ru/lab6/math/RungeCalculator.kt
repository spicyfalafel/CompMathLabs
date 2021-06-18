package ru.lab6.math

import ru.lab6.math.methods.DiffMethod
import ru.lab6.math.methods.EulerMethod
import ru.lab6.math.methods.MilneMethod
import ru.lab6.models.DataInput
import java.util.*
import kotlin.math.pow
import kotlin.collections.ArrayList as ArrayList1

class RungeCalculator {

    fun calculateR(input: DataInput): DoubleArray {
        val method: DiffMethod = if (input.method == 1) EulerMethod() else MilneMethod()
        val result1 = method.calculate(input)
        val y1 = result1.yValues

        val result2 = method.calculate(DataInput(input.func, input.method, input.x0, input.y0,
            input.xn, input.h/2, input.n*2-1, input.accuracy))
        val y2 = result2.yValues

        val res = DoubleArray(y1.size)
        for (i in y1.indices) {
            res[i] = ((y2[i*2] - y1[i]) / (2.0.pow(method.getAccuracyOrder()) - 1))
        }
        return res
    }
}
