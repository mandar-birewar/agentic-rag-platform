from rich import print
from agent.agent import Agent
from rag.manager import rag_manager

rag_manager.ingest("Mandar_Birewar_JusPay.pdf")

def main():

    agent = Agent()

    print("[bold green]Production AI Agent Started[/bold green]")
    print("Type 'exit' to quit.\n")

    while True:

        query = input("You: ")

        if query.lower() == "exit":
            print("\nGoodbye!")
            break

        try:
            response = agent.run(query)
            print(f"\nAgent: {response}\n")

        except Exception as e:
            print(f"\nError: {e}\n")


if __name__ == "__main__":
    main()