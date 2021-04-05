package methods

fun solveRectangleMethod(
    f: (Double) -> Double, a: Double, b: Double,
    parts: Int, chooseMode: (Double, Double) -> Double
): Double {
    var leftX = a
    var rightX = a + (b - a) / parts
    var sum = 0.0
    val partLen = (rightX - leftX)
    repeat(parts) {
        sum += f(chooseMode(leftX, rightX)) * partLen
        leftX += partLen
        rightX += partLen

    }
    return sum
}
