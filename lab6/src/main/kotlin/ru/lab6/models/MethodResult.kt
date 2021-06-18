package ru.lab6.models

data class MethodResult(
    val indexes: IntArray,
    val xValues: DoubleArray,
    val yValues: DoubleArray,
    val exactValues: DoubleArray,
    val derivativeValues: DoubleArray = doubleArrayOf()
)
