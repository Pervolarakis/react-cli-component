import { directories } from './directories';


let currentDirectory = directories;
let currentDirectoryName = '/';

const getSubDirectory = (route) => {
    if (route) {
        return Object.keys(route).toString().split(',').join("\t")
    }
    return ' '
}

export const commands = message => {

    switch (message) {
        case 'help':
            return ('\tls: list all files for current directory\n\tcd: change directory\n\tpwd: get current directory\n\tclear: clean the cli\n\tcat: open a file')

        case 'ls':
            return (`\t${getSubDirectory(currentDirectory)}`)

        case 'pwd':
            return (`\t${currentDirectoryName}`)

        default:
            if (message.startsWith('cd')) {
                let route = message.split(" ")[1];
                if (route) {
                    if (route.startsWith('..')) {
                        let jumpCnt = route.split('/').length;
                        for (let i = 0; i < jumpCnt; i++) {
                            let newRoute = currentDirectoryName.split('/');
                            newRoute.pop()
                            newRoute.pop()
                            newRoute.shift();
                            currentDirectory = directories
                            currentDirectoryName = '/'
                            newRoute.forEach((value, key) => {
                                currentDirectory = currentDirectory[value]
                                currentDirectoryName += (value + '/')
                            })
                        }
                        return (`\tswitched to ${currentDirectoryName}`)

                    } else {
                        if (currentDirectory[route] !== undefined) {
                            currentDirectory = currentDirectory[route];
                            currentDirectoryName = currentDirectoryName + route + '/';
                            return (`\tswitched to ${route}`)
                        }
                        return (`\tunkown path ${route}`)
                    }

                }
            }
            if (message.startsWith('cat')) {
                let file = message.split(" ")[1];
                if (file) {
                    if (currentDirectory[file] !== undefined) {
                        return (`\t${currentDirectory[file]}`)
                    }
                    else {
                        return (`\tunknown file ${file}`)
                    }
                }
            }
            return (`\tunknown command ${message}`)
    }
}
