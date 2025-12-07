#include <vector>
#include <string>
#include <iostream>
#include <regex>



// returns splitted results without the delimeterstring,  not containing empty parts
std::vector<std::string> Split (std::string const& str, std::string const& delim) {
    std::vector<std::string> ret;
    size_t pos = 0;
    size_t lastPos = pos;
    while ((pos = str.find (delim,lastPos)) != std::string::npos) {
        if (pos != lastPos ) {
            ret.push_back (str.substr (lastPos, pos - lastPos));
        }
        lastPos = pos + delim.length();
    }
    if (lastPos != str.length ())
        ret.push_back (str.substr (lastPos));

    return ret;
}

size_t GetNumber (std::string const &str) {
    std::string output = std::regex_replace (
        str,
        std::regex ("[^0-9]*([0-9]+).*"),
        std::string ("$1"));
    return std::atoi (output.c_str());
}


int main(int argc, char const *argv[])
{
    std::string line;
    
    std::getline (std::cin, line);

    size_t sum =0;
    while (!line.empty ()) { 
        size_t lineWorth =0;
        auto numbers = Split (Split(line,":")[1], "|");

        std::vector<size_t> winningNumbers;

        for (auto &&i : Split (numbers[0], " "))
            winningNumbers.push_back (GetNumber(i));

        for (auto &&i : Split (numbers[1], " "))
            if (std::find (winningNumbers.begin(), winningNumbers.end(),GetNumber(i)) != winningNumbers.end())
                lineWorth = lineWorth == 0 ? 1 : lineWorth * 2;
            
        sum += lineWorth;
        
        
        
        
        std::getline (std::cin, line);
    }
    std::cout << sum;
    return 0;
}