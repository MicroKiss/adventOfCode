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

/*
    for (int i = 0; i <3; i++)
        std:: cout << lines[i] << "\n";
    
*/



int main(int argc, char const *argv[])
{
    std::string lines[3];
    std::string symbols = "*#+$/-=%@&";
    
    std::getline (std::cin, lines[1]);
    std::getline (std::cin, lines[2]);
    lines[0] = std::string (lines[1].length(),'.');

    size_t sum =0;
    bool over = false;
    while (true) { 
        //feldolgozni a line1 et

        size_t foundNumber = lines[1].find_first_of("0123456789");
        size_t pos =foundNumber;
        while (foundNumber != std::string::npos) {
            size_t num = GetNumber (lines[1].substr (pos));
            std::cout << "checking number: " << num << "\n";
            size_t lengthOfNum = std::to_string(num).length();
            bool good = false;
            size_t jMin = pos == size_t(0) ? 0 : pos -1;
            size_t jMax = std::min (pos + lengthOfNum+1, lines[1].length() );
            std::cout <<"jMinMax: " << jMin << " " << jMax << "\n";
            std::cout << "checking with these characters:\n";
            for (size_t i = 0; i < 3; i++)
            {
                for (size_t j = jMin; j < jMax; j++)
                {
                    std::cout << lines[i][j];
                    if( symbols.find_first_of (lines[i][j]) != std::string::npos )
                        good = true;
                }
                std::cout << "\n";
            }
            if (good) {
                std::cout << "is good\n"; 
                sum +=num;
            } else {
                std::cout << "is bad\n"; 

            }


            foundNumber = lines[1].substr(pos+lengthOfNum).find_first_of("0123456789");
            pos += foundNumber + lengthOfNum;
        }
        if (over) {
            break;
        }

        lines[0]= lines[1];
        lines[1]= lines[2];
        std::getline (std::cin, lines[2]);

        if (lines[2].empty ()) {
            over = true;
            lines[2] = std::string (lines[1].length(),'.');
        }
    }
    
    std::cout << sum;
    return 0;
}
