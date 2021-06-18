package ru.lab6.math.methods

import ru.lab6.models.DataInput
import ru.lab6.models.MethodResult

interface DiffMethod {
    fun calculate(input: DataInput): MethodResult

    fun getAccuracyOrder(): Int
}
