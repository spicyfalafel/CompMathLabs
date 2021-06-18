package ru.lab6.models

data class MathFunction(
    val view: String,
    val derivative: (Double, Double) -> Double,
    val exact: (Double, Double) -> Double,
    val const: (Double, Double) -> Double
)
