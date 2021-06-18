package ru.lab6.math.methods

import ru.lab6.math.CommonUtils
import ru.lab6.models.DataInput
import ru.lab6.models.MethodResult
import kotlin.math.abs

private const val FIRST_ELEMENTS_COUNT = 4

class MilneMethod : DiffMethod {


    override fun calculate(input: DataInput): MethodResult {
        val h = input.h
        val x = DoubleArray(input.n) {input.x0 + it*input.h}

        val exactYValues: DoubleArray =
            CommonUtils.calculateExactValues(input.func, x, input.func.const(input.x0, input.y0))

        val first3Y = getFirstYValues(input)
        val y = DoubleArray(input.n) { if (it < FIRST_ELEMENTS_COUNT) first3Y[it] else 0.0 }
        val f = DoubleArray(input.n) {
            if (it < FIRST_ELEMENTS_COUNT) input.func.derivative(x[it],
                y[it]) else 0.0
        }

        for (i in FIRST_ELEMENTS_COUNT until input.n) {
            val xCurr = x[i - 1]
            var yProgn = y[i - 4] + 4 * h / 3 *
                    (2 * f[i - 3] - f[i - 2] + 2 * f[i - 1])
            f[i] = input.func.derivative(xCurr, yProgn)
            var yKorr = y[i - 2] + h / 3 * (f[i - 2] + 4 * f[i - 1] + f[i])
            while (abs(yKorr - yProgn) / 29 > input.accuracy) {
                yProgn = yKorr
                f[i] = input.func.derivative(xCurr, yProgn)
                yKorr = y[i - 2] + h / 3 * (f[i - 2] + 4 * f[i - 1] + f[i])
            }
            y[i] = yKorr
        }

        f[input.n - 1] = input.func.derivative(x[input.n - 1], y[input.n - 1])
        val indexes = IntArray(input.n) { it }
        return MethodResult(indexes, x, y, exactYValues, f)
    }

    private fun getFirstYValues(input: DataInput): DoubleArray {
        return RungeKuttaMethod().calculate(DataInput(input.func, input.method, input.x0, input.y0,
            input.x0 + input.h * 3, input.h, FIRST_ELEMENTS_COUNT, input.accuracy)).yValues
    }

    override fun getAccuracyOrder(): Int {
        return 4
    }
}
