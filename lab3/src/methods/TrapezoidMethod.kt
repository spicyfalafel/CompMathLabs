package methods

fun solveTrapezoidMethod(
    f: (Double) -> Double, a: Double, b: Double,
    parts: Int,
): Double {
    val partLen = (b - a) / parts
    var xi = a + partLen
    var sum = (f(a) + f(b)) / 2
    for (i in 1 until parts) {
        sum += f(xi)
        xi += partLen
    }
    return sum * partLen
}

