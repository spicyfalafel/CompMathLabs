package methods

fun solveRectangleMethod(
    f: (Double) -> Double, a: Double, b: Double,
    parts: Int, chooseMode: (Double, Double) -> Double
): Double {
    val partLen = (b-a)/parts
    var leftX = a
    var rightX = a + partLen
    var sum = 0.0
    repeat(parts) {
        println("f(chooseMode($leftX, $rightX)) * partLen= f(${chooseMode(leftX, rightX)}) * $partLen")
        sum += f(chooseMode(leftX, rightX)) * partLen
        leftX += partLen
        rightX += partLen
    }
    return sum
}
