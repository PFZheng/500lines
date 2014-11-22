import sys
import logging
from fleet import Ship


def key_value_state_machine(state, input_value):
    print input_value, state
    if input_value[0] == 'get':
        return state, state.get(input_value[1], None)
    elif input_value[0] == 'set':
        state[input_value[1]] = input_value[2]
        return state, input_value[2]


def main():
    logging.basicConfig(format="%(asctime)s - %(name)s - %(message)s", level=logging.WARNING)

    if sys.argv[1] == '--seed':
        sys.argv.pop(1)
        seed = {}
    else:
        seed = None

    # 在本机模拟网络
    ship = Ship(state_machine=key_value_state_machine,
                port=int(sys.argv[1]), peers=['127.0.0.1-%s' % p for p in sys.argv[2:]],
                seed=seed)
    ship.start()

    for event in ship.events():
        print event
        old = ship.invoke(('get', sys.argv[1])) or 0
        print "got", old
        ship.invoke(('set', sys.argv[1], old + 1))


if __name__ == "__main__":
    main()
