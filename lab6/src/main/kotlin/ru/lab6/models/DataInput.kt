package ru.lab6.models

data class DataInput(
    val func: MathFunction,
    val method: Int,
    val x0: Double,
    val y0: Double,
    val xn: Double,
    var h: Double,
    var n: Int,
    val accuracy: Double
)
