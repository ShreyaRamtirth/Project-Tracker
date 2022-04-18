const LOGIN_URL = "/authenticate";
const VALIDATE_URL = "/validatecookie";
const GET_USER_URL = "/forgot";
const SEND_OTP = "/verifyotp";
const RESETPASS = "/resetpass";
const GETPROJECT = "http://localhost:8080/getprojects/search";
const TOTALPROJECT = "http://localhost:8080/count";
const GETPAGE = "http://localhost:8080/getprojects/page/";
const GETPROJECTDETAILS = "http://localhost:8080/getproject/";
const UpdateProject = "http://localhost:8080/project/update";
const CreateProject = "http://localhost:8080/project/add";
const CreateEmployee = "http://localhost:8080/user/add";
const CreateClient = "http://localhost:8080/client/add";
const GetClient = "http://localhost:8080/client/names";
const GetUserTask = "http://localhost:8080/user/tasks/";
const GetUserInfo = "http://localhost:8080/user/info/";
const GetUserUpdate = "http://localhost:8080/user/update/";
const GetUsers = "http://localhost:8080/users/page/";
const TotalEmployee = "http://localhost:8080/users/count";
const GetUsersbyName = "http://localhost:8080/users/search/";
const GetClientCount = "http://localhost:8080/clients/count";
const GetClientInfo = "http://localhost:8080/clients/page/";
const GetClientByName = "http://localhost:8080/clients/search/";
const CountProjectEmp = "http://localhost:8080/user/count/projects/";
const PriorityProjects = "http://localhost:8080/projects/priority";
const CountProjectsCompletion = "http://localhost:8080/projects/all/count";
const CostProjects = "http://localhost:8080/projects/all/cost";
const ProgressProjects = "http://localhost:8080/projects/all/progress";
export {
    LOGIN_URL,
    VALIDATE_URL,
    GET_USER_URL,
    SEND_OTP,
    RESETPASS,
    GETPROJECT,
    TOTALPROJECT,
    GETPAGE,
    GETPROJECTDETAILS,
    UpdateProject,
    CreateProject,
    CreateEmployee,
    CreateClient,
    GetClient,
    GetUserTask,
    GetUserInfo,
    GetUserUpdate,
    GetUsers,
    TotalEmployee,
    GetUsersbyName,
    GetClientCount,
    GetClientInfo,
    GetClientByName,
    CountProjectEmp,
    PriorityProjects,
    CountProjectsCompletion,
    CostProjects,
    ProgressProjects
}
