#include <iostream>
#include <string>



int main(int argc, char const *argv[])
{
    std::string inputLine;
    std::getline (std::cin,inputLine);
    uint32_t sum =0;
    while (!inputLine.empty ()) {
        bool firstFound = false;
        uint32_t first, current;
        for (auto &&i : inputLine) {
            if (std::isdigit (i)) {
                current = int(i) - '0';
                    if(!firstFound) {
                        firstFound = true;
                        first = current;
                    }
                }
        }
        sum += first * 10 + current;
       std::getline (std::cin,inputLine);
    }
    std::cout << sum;
    return 0;
}
