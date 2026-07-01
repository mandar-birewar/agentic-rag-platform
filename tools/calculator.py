import ast
import operator


OPS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
}


def calculator(expression: str) -> float:
    """
    Evaluate a mathematical expression.

    Args:
        expression: Mathematical expression.
    """

    def evaluate(node):

        if isinstance(node, ast.Constant):
            return node.value

        if isinstance(node, ast.BinOp):
            return OPS[type(node.op)](
                evaluate(node.left),
                evaluate(node.right)
            )

        raise ValueError("Invalid expression")

    tree = ast.parse(expression, mode="eval")

    return evaluate(tree.body)