package ru.lab6.math.methods

import ru.lab6.math.CommonUtils
import ru.lab6.models.DataInput
import ru.lab6.models.MethodResult

class EulerMethod : DiffMethod {

    override fun calculate(input: DataInput): MethodResult {
        val xValues = DoubleArray(input.n) {input.x0 + it*input.h}

        val exactYValues: DoubleArray =
            CommonUtils.calculateExactValues(input.func, xValues, input.func.const(input.x0, input.y0))

        val yValues = DoubleArray(input.n) { input.y0 }

        val derivatives = DoubleArray(input.n)

        for (i in 1 until input.n) {
            // f(x_i, y_i)
            derivatives[i - 1] = input.func.derivative(xValues[i - 1], yValues[i - 1])
            //y_i
            yValues[i] = yValues[i - 1] + input.h * derivatives[i - 1]
        }
        derivatives[input.n - 1] = input.func.derivative(xValues[input.n - 1], yValues[input.n - 1])

        val indexes = IntArray(input.n) { it }
        return MethodResult(indexes, xValues, yValues, exactYValues, derivatives)
    }

    override fun getAccuracyOrder(): Int {
        return 1
    }
}
