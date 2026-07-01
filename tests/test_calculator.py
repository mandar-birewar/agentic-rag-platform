import unittest

from tools.calculator import CalculatorTool


class CalculatorToolTests(unittest.TestCase):
    def test_execute_returns_arithmetic_result(self):
        tool = CalculatorTool()

        self.assertEqual(tool.execute("2+3"), "5")
        self.assertEqual(tool.execute("10/2"), "5")


if __name__ == "__main__":
    unittest.main()
