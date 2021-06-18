package ru.lab6

import ru.lab6.console.ConsoleReader
import ru.lab6.console.ResultWriter
import ru.lab6.gui.Charts
import ru.lab6.math.CommonUtils
import ru.lab6.math.CommonUtils.Companion.MAX_N
import ru.lab6.math.CommonUtils.Companion.MIN_H
import ru.lab6.math.RungeCalculator
import ru.lab6.math.methods.DiffMethod
import ru.lab6.math.methods.EulerMethod
import ru.lab6.math.methods.MilneMethod
import ru.lab6.models.DataInput
import ru.lab6.models.MethodResult
import java.util.*


fun main(args: Array<String>) {
    val input: DataInput = ConsoleReader().readInput()
    val diffMethod: DiffMethod = if(input.method == 1) EulerMethod() else MilneMethod()
    var methodResult: MethodResult;
    methodResult = diffMethod.calculate(input)
    CommonUtils.validateValues(methodResult)
    while(!checkAcc(input) && (input.h > MIN_H) && (input.n < MAX_N )){
        input.h = input.h/2
        input.n = input.n*2-1
        methodResult = diffMethod.calculate(input)
        CommonUtils.validateValues(methodResult)
    }

    Charts.draw(input, methodResult)
    println("h: ${input.h} n ${input.n}")
    ResultWriter().writeResult(input, methodResult)
}

fun checkAcc(input: DataInput): Boolean{
    val rungeVals = RungeCalculator().calculateR(input)
    for(i in rungeVals.indices){
        if(rungeVals[i] > input.accuracy){
            return false
        }
    }
    return true
}

