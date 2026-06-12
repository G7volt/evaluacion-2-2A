const logOutController = {};

logOutController.logOut = async (req, res) => {
    try {
        res.clearCookie("authCookie")
        return res.status(200).json({message: "sesion cerrada"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default logOutController;