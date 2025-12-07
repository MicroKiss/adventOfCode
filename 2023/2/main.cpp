#include <iostream>
#include <regex>
#include <string>
#include <vector>


std::vector<std::string> Split (std::string str, char delim) {
        std::vector<std::string> ret;
        size_t pos = 0;
        size_t lastPos =0;
        while(pos < str.size()){
            lastPos = pos;
            pos = str.find(delim, pos+1);
            std::string game = str.substr(lastPos+1,pos-lastPos-1);
            ret.push_back (game);
        }
        return ret;
}

size_t GetNumber (std::string const &str) {
    std::string output = std::regex_replace (
        str,
        std::regex ("[^0-9]*([0-9]+).*"),
        std::string ("$1"));
    return std::atoi (output.c_str());
}

int main (int argc, char const *argv[]) {
    size_t const reds = 12;
    size_t const greens = 13;
    size_t const blues = 14;

    std::string inputLine;
    std::getline (std::cin, inputLine);
    uint32_t sum = 0;
    while (!inputLine.empty ()) {
        bool possibleGames = true; 

        size_t colonPos = inputLine.find (":");
        std::string gamesPart = inputLine.substr (colonPos);
        auto games = Split (gamesPart, ';');
        for (auto &&game : games) {
            auto informations = Split (game, ',');
            for (std::string &i : informations) {
                if(i.find("green")!= std::string::npos) {
                    possibleGames = (GetNumber (i) <= greens);
                } else if (i.find("red")!= std::string::npos) {
                    possibleGames = (GetNumber (i) <= reds);
                } else if (i.find("blue")!= std::string::npos) {
                    possibleGames = (GetNumber (i) <= blues);
                }
                if (!possibleGames)
                    break;
            }
            if (!possibleGames)
                break;
        }
        if (possibleGames) {
            sum += GetNumber (inputLine.substr (0, colonPos));
            std::cout << GetNumber (inputLine.substr (0, colonPos)) << "is good \n";
        }
        
        std::getline (std::cin, inputLine);
    }
    std::cout << sum;
    return 0;
}
