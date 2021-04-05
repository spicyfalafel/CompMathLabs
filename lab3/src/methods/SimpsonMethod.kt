package methods

fun solveSimpsonMethod(
    f: (Double) -> Double, a: Double, b: Double,
    parts: Int,
): Double {
    val h: Double = (b - a) / parts
    var sum = 0.0
    var x: Double = a
    for (i in 0..parts) {
        sum += when{
            i == 0 || i == parts -> f(x)
            (i % 2 == 1) -> 4 * f(x)
            else  -> 2 * f(x)
        }
        x += h
    }
    return h / 3 * sum
}

