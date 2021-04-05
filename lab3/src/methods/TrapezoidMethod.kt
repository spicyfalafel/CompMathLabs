package methods

fun solveTrapezoidMethod(
    f: (Double) -> Double, a: Double, b: Double,
    parts: Int,
): Double {
    var xLeft = a
    val partLen = (b - a) / parts
    var xRight = a + partLen
    var sum = 0.0
    for (i in 0..parts) {
        val yLeft = f(xLeft)
        val yRight = f(xRight)
        sum += (yLeft + yRight) / 2.0
        xLeft = xRight
        xRight += partLen
    }
    return sum * partLen
}
