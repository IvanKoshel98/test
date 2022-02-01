/*
понимаю что хардкор(дичь), но не смог понять логику
начала движения по спирали и разбивку по длинне шагов
*/
const matrix = [[5, 3, 6], [7, 11, 2], [15, 9, 4]]

const myFunc = (matrix) => {
    return [
        [
            matrix[2][0] + matrix[1][0] + matrix[0][0] + matrix[0][1],
            matrix[0][2] + matrix[1][2] + matrix[2][2]
        ],
        [
            matrix[2][1],
            matrix[1][1]
        ]
    ]
}
myFunc(matrix) // [[30, 12], [9, 11]]